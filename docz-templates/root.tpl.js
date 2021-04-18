import React from 'react'
import { GlobalStyles, FontPenrose } from '@qunhe/muya-theme-light';
import { Link, Routes<% if (!isProd) {%>, useDataServer<%}%> } from 'docz'
<% if (!isProd) {%>import { hot } from 'react-hot-loader'<%}%>
import Theme from '<%- theme %>'

import { imports } from './imports'
import database from './db.json'
<% if (wrapper) {%>import Wrapper from '<%- wrapper %>'<%}%>
import { ThemeConfigContext } from '<%- theme %>'
import { apiPropsMap, apiTypeMap } from 'api/apiData'

const Root = () => {
<% if (!isProd && websocketUrl) {%>useDataServer('<%- websocketUrl %>')<%}%>
  const data = { props: apiPropsMap, type: apiTypeMap }
  return (
    <Theme
      <% if (wrapper) {%>wrapper={Wrapper}<%}%>
      linkComponent={Link}
      db={database}
    >
      <ThemeConfigContext.Provider value={data}>
        <FontPenrose />
        <GlobalStyles resetScrollBar={true} />
        <Routes imports={imports} />
      </ThemeConfigContext.Provider>
    </Theme>
)
}

<% if (!isProd) {%>export default hot(module)(Root)<%}%>
<% if (isProd) {%>export default Root<%}%>
