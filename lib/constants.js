var exports = module.exports = {};
exports.constantNames = {
    'fileName': 'file name',
    'nameElement': 'name='
};
exports.type = {
    'fileName': 'fileName',
    'nameElement': 'nameElement'
};
exports.validValues = ['dash'];
exports.OAUTHV2 = 'OAuthV2';
exports.EXTRACT_VARIABLES = 'ExtractVariables';
exports.xPaths = {
    'assign_message_name': '/AssignMessage/@name',
    'assign_message_assign_to': '/AssignMessage/AssignTo/text()',
    'assign_message_assign_variable_name': '/AssignMessage/AssignVariable/Name/text()',
    'oauthv2_name': '/OAuthV2/@name',
    'extract_variables_name': '/ExtractVariables/@name',
    'extract_variables_queryparam_pattern_text':'/ExtractVariables/QueryParam/Pattern/text()',
    'extract_variables_queryparam_pattern':'/ExtractVariables/QueryParam/Pattern', 
    'extract_variables_uri_pattern_text':'/ExtractVariables/URIPath/Pattern/text()',
    'extract_variables_uri_pattern':'/ExtractVariables/URIPath/Pattern', 
    'extract_variables_header_pattern_text':'/ExtractVariables/Header/Pattern/text()',
    'extract_variables_header_pattern':'/ExtractVariables/Header/Pattern',
    'extract_variables_form_param_pattern_text':'/ExtractVariables/FormParam/Pattern/text()',
    'extract_variables_form_param_pattern':'/ExtractVariables/FormParam/Pattern',
    'extract_variables_variable_pattern_text':'/ExtractVariables/Variable/Pattern/text()',
    'extract_variables_variable_pattern':'/ExtractVariables/Variable/Pattern',
    'extract_variables_variable_name':'/ExtractVariables/Variable/@name'

};
