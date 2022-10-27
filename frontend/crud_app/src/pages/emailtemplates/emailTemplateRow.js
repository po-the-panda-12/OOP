import React from 'react';
import { Link } from 'react-router-dom';
function EmailTemplateRow(props) {
    return (
        <div>
            {props.template.emailTemplateName}
            <button className='btn btn-primary'><Link style={{color:"white"}} to = "/react/emailtemplates/edit">Edit</Link></button>
            <button className='btn btn-danger'><Link style={{color:"white"}}>Delete</Link></button>
        </div>
    );
}

export default EmailTemplateRow;