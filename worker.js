const STATE_KEY = 'shared-menu-state';
const DO_STATE_KEY = 'state';
const DO_NAME = 'shared-menu-state';

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

async function handleKVRequest(request, env) {
  if (!env.FAMILY_MENU_STATE) {
    return json({ error: 'Missing sync storage binding' }, 500);
  }

  if (request.method === 'GET') {
    const raw = await env.FAMILY_MENU_STATE.get(STATE_KEY);
    return json({ state: raw ? JSON.parse(raw) : null });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const state = readState(body);
    await env.FAMILY_MENU_STATE.put(STATE_KEY, JSON.stringify(state));
    return json({ ok: true, state, storage: 'kv' });
  }

  return json({ error: 'Method not allowed' }, 405);
}

async function handleSyncRequest(request, env) {
  if (!env.FAMILY_MENU_SYNC) {
    return handleKVRequest(request, env);
  }

  const id = env.FAMILY_MENU_SYNC.idFromName(DO_NAME);
  const stub = env.FAMILY_MENU_SYNC.get(id);
  return stub.fetch(request);
}

export class MenuStateSync {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async fetch(request) {
    if (request.method === 'GET') {
      const state = await this.ctx.storage.get(DO_STATE_KEY);
      return json({ state: state || null, storage: 'durable-object' });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const state = readState(body);
      await this.ctx.storage.put(DO_STATE_KEY, state);
      return json({ ok: true, state, storage: 'durable-object' });
    }

    return json({ error: 'Method not allowed' }, 405);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/menu-state') {
      return handleSyncRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};