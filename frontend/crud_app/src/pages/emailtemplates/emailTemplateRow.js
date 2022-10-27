import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function EmailTemplateRow({template,deleteFunction}) {

    return (
        <div>
            {template.emailTemplateName}
            <button className='btn btn-primary'><Link style={{color:"white"}} to = {"/react/emailtemplates/edit/"+template.emailTemplateId}>Edit</Link></button>
            <button className='btn btn-danger' onClick={()=>{deleteFunction(template.emailTemplateId)}}>Delete</button>
        </div>
    );
}

export default EmailTemplateRow;