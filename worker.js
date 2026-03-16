const STATE_KEY = 'shared-menu-state';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'cache-control': 'no-store'
    }
  });
}

function readState(body) {
  return {
    dishes: Array.isArray(body.dishes) ? body.dishes : [],
    todayMenu: Array.isArray(body.todayMenu) ? body.todayMenu : [],
    history: Array.isArray(body.history) ? body.history : [],
    updatedAt: typeof body.updatedAt === 'number' ? body.updatedAt : Date.now()
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/menu-state') {
      if (!env.FAMILY_MENU_STATE) {
        return json({ error: 'Missing KV binding FAMILY_MENU_STATE' }, 500);
      }

      if (request.method === 'GET') {
        const raw = await env.FAMILY_MENU_STATE.get(STATE_KEY);
        return json({ state: raw ? JSON.parse(raw) : null });
      }

      if (request.method === 'POST') {
        const body = await request.json();
        const state = readState(body);
        await env.FAMILY_MENU_STATE.put(STATE_KEY, JSON.stringify(state));
        return json({ ok: true, state });
      }

      return json({ error: 'Method not allowed' }, 405);
    }

    return env.ASSETS.fetch(request);
  }
};