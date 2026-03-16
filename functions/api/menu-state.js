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

function getBinding(env) {
  return env.FAMILY_MENU_STATE;
}

export async function onRequestGet(context) {
  const binding = getBinding(context.env);
  if (!binding) {
    return json({ error: 'Missing KV binding FAMILY_MENU_STATE' }, 500);
  }

  const raw = await binding.get(STATE_KEY);
  if (!raw) {
    return json({ state: null });
  }

  return json({ state: JSON.parse(raw) });
}

export async function onRequestPost(context) {
  const binding = getBinding(context.env);
  if (!binding) {
    return json({ error: 'Missing KV binding FAMILY_MENU_STATE' }, 500);
  }

  const body = await context.request.json();
  const state = {
    dishes: Array.isArray(body.dishes) ? body.dishes : [],
    todayMenu: Array.isArray(body.todayMenu) ? body.todayMenu : [],
    history: Array.isArray(body.history) ? body.history : [],
    updatedAt: typeof body.updatedAt === 'number' ? body.updatedAt : Date.now()
  };

  await binding.put(STATE_KEY, JSON.stringify(state));
  return json({ ok: true, state });
}