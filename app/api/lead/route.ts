const AMOCRM_SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN || "possgroup";
const AMOCRM_TOKEN = process.env.AMOCRM_ACCESS_TOKEN;
const AMOCRM_SOURCE_NAME = process.env.AMOCRM_SOURCE_NAME || "Bepul audit olish formasi";
const AMOCRM_FORM_ID = process.env.AMOCRM_FORM_ID || "bepul_audit_olish";
const AMOCRM_FORM_NAME = process.env.AMOCRM_FORM_NAME || "Bepul audit olish";
const BUSINESS_FIELD_ID = Number(process.env.AMOCRM_BUSINESS_FIELD_ID || 1787113);
const TURNOVER_FIELD_ID = Number(process.env.AMOCRM_TURNOVER_FIELD_ID || 1787115);
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function jsonResponse(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function sendToTelegram({
  name,
  phone,
  business,
  turnover,
}: {
  name: string;
  phone: string;
  business: string;
  turnover: string;
}) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    return { ok: false, error: "telegram_missing_env" };
  }

  const text = [
    "Yangi ariza",
    `Ism: ${name}`,
    `Telefon: ${phone}`,
    `Biznes: ${business || "-"}`,
    `Aylanish: ${turnover || "-"}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      }
    );

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      console.error("Telegram rejected lead", response.status, details);
      return { ok: false, error: "telegram_error", status: response.status };
    }

    return { ok: true };
  } catch (error) {
    console.error("Telegram request failed", error);
    return { ok: false, error: "telegram_unreachable" };
  }
}

async function sendToAmoCrm({
  name,
  phone,
  business,
  turnover,
  origin,
  referer,
}: {
  name: string;
  phone: string;
  business: string;
  turnover: string;
  origin: string;
  referer: string;
}) {
  if (!AMOCRM_TOKEN) {
    return { ok: false, error: "amocrm_missing_env" };
  }

  const now = Math.floor(Date.now() / 1000);
  const sourceUid = `site-form-${crypto.randomUUID().toLowerCase()}`;
  const payload = [
    {
      request_id: sourceUid,
      source_name: AMOCRM_SOURCE_NAME,
      source_uid: sourceUid,
      created_at: now,
      _embedded: {
        leads: [
          {
            name: `saytdan kegan lid + ${name}`,
            price: 0,
            custom_fields_values: [
              { field_id: BUSINESS_FIELD_ID, values: [{ value: business }] },
              { field_id: TURNOVER_FIELD_ID, values: [{ value: turnover }] },
            ],
          },
        ],
        contacts: [
          {
            name,
            custom_fields_values: [
              {
                field_code: "PHONE",
                values: [{ value: phone, enum_code: "WORK" }],
              },
            ],
          },
        ],
      },
      metadata: {
        form_id: AMOCRM_FORM_ID,
        form_name: AMOCRM_FORM_NAME,
        form_page: origin,
        form_sent_at: now,
        referer,
      },
    },
  ];

  try {
    const response = await fetch(
      `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/unsorted/forms`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AMOCRM_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      console.error("amoCRM rejected lead", response.status, details);
      return { ok: false, error: "amocrm_error", status: response.status };
    }

    return { ok: true };
  } catch (error) {
    console.error("amoCRM request failed", error);
    return { ok: false, error: "amocrm_unreachable" };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const business = String(body?.business || "").trim();
    const turnover = String(body?.turnover || "").trim();

    if (!name || !phone || phoneDigits.length < 12) {
      return jsonResponse({ ok: false, error: "missing_fields" }, 400);
    }

    if (!AMOCRM_TOKEN && (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID)) {
      console.error("Neither amoCRM nor Telegram is configured");
      return jsonResponse({ ok: false, error: "missing_env" }, 503);
    }

    const origin = request.headers.get("origin") || new URL(request.url).origin;
    const referer = request.headers.get("referer") || origin;
    const lead = { name, phone, business, turnover };

    const [telegram, amocrm] = await Promise.all([
      sendToTelegram(lead),
      sendToAmoCrm({ ...lead, origin, referer }),
    ]);
    const channels = { telegram, amocrm };
    const allSucceeded = telegram.ok && amocrm.ok;
    const oneSucceeded = telegram.ok || amocrm.ok;

    if (!allSucceeded) {
      console.error("Lead delivery is incomplete", channels);
      return jsonResponse(
        { ok: false, partial: oneSucceeded, error: "delivery_incomplete", channels },
        502
      );
    }

    return jsonResponse({ ok: true, channels });
  } catch {
    return jsonResponse({ ok: false, error: "bad_request" }, 400);
  }
}
