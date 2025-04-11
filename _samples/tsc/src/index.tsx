import useSWR from 'swr'

async function fetcher(...args: [RequestInfo, RequestInit?]) {
  const res = await fetch(...args)
  return res.json()
}

export default function () {
  const id = typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const { data, error, isLoading } = useSWR('./data?id=' + id, fetcher)
  const { data: data2 } = useSWR(null, fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{id}</h1>
      {data2}
      {
        data ? <div>
          <p>forks: {data.forks_count}</p>
          <p>stars: {data.stargazers_count}</p>
          <p>watchers: {data.watchers}</p>
        </div> : 'loading...'
      }
      <br />
      <br />
    </div>
  )
}
