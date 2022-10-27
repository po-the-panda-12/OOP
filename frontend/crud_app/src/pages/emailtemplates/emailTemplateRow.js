import React from 'react';
import { Link } from 'react-router-dom';
function EmailTemplateRow(props) {
    function deleteTemplate (templateId){
        
    }
    return (
        <div>
            {props.template.emailTemplateName}
            <button className='btn btn-primary'><Link style={{color:"white"}} to = {"/react/emailtemplates/edit/"+props.template.emailTemplateId}>Edit</Link></button>
            <button className='btn btn-danger' onClick={deleteTemplate(props.template.emailTemplateId)}>Delete</button>
        </div>
    );
}

export default EmailTemplateRow;