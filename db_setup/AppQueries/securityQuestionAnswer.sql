SELECT question_history.*, question_answer_history.*
FROM active_users INNER JOIN question_answer_history INNER JOIN question_history
ON (user_id = answer_user_id AND answer_question_id = question_id)
WHERE user_id = ? AND answer_status = 1 AND question_id = ?
