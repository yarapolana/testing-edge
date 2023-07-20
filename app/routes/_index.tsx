import { Heading } from '@chakra-ui/react'
import { useFetcher } from '@remix-run/react'
import type { V2_MetaFunction } from "@vercel/remix";
import { useEffect } from 'react'

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.data && alert(fetcher.data)
  }, [fetcher])

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Heading color="red.400">Welcome to Remix</Heading>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial.
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <fetcher.Form method="post" action='/api/edge'>
        <div style={{ display: 'flex', maxWidth: 350, flexDirection: 'column'}}>
          <input type="text" name="name" placeholder='Name' style={{ border: '1px solid #555' }} />
          <button type="submit">Submit</button>
        </div>
      </fetcher.Form>
    </div>
  );
}
