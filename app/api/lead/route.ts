const AMOCRM_SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN || "possgroup";
const AMOCRM_TOKEN = process.env.AMOCRM_ACCESS_TOKEN;
const AMOCRM_SOURCE_NAME = process.env.AMOCRM_SOURCE_NAME || "Bepul audit olish formasi";
const AMOCRM_FORM_ID = process.env.AMOCRM_FORM_ID || "bepul_audit_olish";
const AMOCRM_FORM_NAME = process.env.AMOCRM_FORM_NAME || "Bepul audit olish";
const BUSINESS_FIELD_ID = Number(process.env.AMOCRM_BUSINESS_FIELD_ID || 1787113);
const TURNOVER_FIELD_ID = Number(process.env.AMOCRM_TURNOVER_FIELD_ID || 1787115);

function jsonResponse(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
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

    if (!AMOCRM_TOKEN) {
      return jsonResponse({ ok: false, error: "missing_env" }, 500);
    }

    const now = Math.floor(Date.now() / 1000);
    const sourceUid = `site-form-${crypto.randomUUID().toLowerCase()}`;
    const origin = request.headers.get("origin") || new URL(request.url).origin;
    const referer = request.headers.get("referer") || origin;

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
                {
                  field_id: BUSINESS_FIELD_ID,
                  values: [{ value: business }],
                },
                {
                  field_id: TURNOVER_FIELD_ID,
                  values: [{ value: turnover }],
                },
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

    const res = await fetch(
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

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      return jsonResponse(
        {
          ok: false,
          error: "amocrm_error",
          status: res.status,
          details: errorText || null,
        },
        502
      );
    }

    return jsonResponse({ ok: true });
  } catch {
    return jsonResponse({ ok: false, error: "bad_request" }, 400);
  }
}
