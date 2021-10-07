import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

function Admin({company, setCompany}) {

  return (
    <div>
      <p>Set company name:</p>
      <Input value={company} onChange={e => setCompany(e.target.value)}

    </div>
  )
}

Admin.propTypes = {

}

export default Admin

