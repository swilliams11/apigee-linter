var exports = module.exports = {};
exports.constantNames = {
    'fileName': 'file name=',
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
    'extract_variables_name': '/ExtractVariables/@name'
};
