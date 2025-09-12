export function injectSSR(template: string, appHtml: string, dehydratedState: unknown) {
    return template
        .replace("<!--ssr-outlet-->", appHtml)
        .replace(
            "<!--react-query-state-->",
            `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}</script>`
        );
}
