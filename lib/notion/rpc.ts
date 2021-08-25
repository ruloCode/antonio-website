import fetch, { Response } from 'node-fetch'
import { API_ENDPOINT } from './server-constants'

export default async function rpc(fnName: string, body: any) {
  const res = await fetch(`${API_ENDPOINT}/${fnName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error(await getError(res))
  }
}

export async function getError(res: Response) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`
}

export function getJSONHeaders(res: Response) {
  return JSON.stringify(res.headers.raw())
}

export function getBodyOrNull(res: Response) {
  try {
    return res.text()
  } catch (err) {
    return null
  }
}

export function values(obj: any) {
  const vals: any = []

  Object.keys(obj).forEach((key) => {
    vals.push(obj[key])
  })
  return vals
}
