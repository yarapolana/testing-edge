import type { ActionArgs } from '@vercel/remix'

// export const config = { runtime: 'edge' };

export const loader = async () => {
  return null
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  const name = formData.get('name')
  return name
}
