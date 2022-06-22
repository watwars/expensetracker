CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    username STRING UNIQUE,
    email STRING UNIQUE,
    user_password STRING
);

CREATE TABLE IF NOT EXISTS expenses (
    user_id UUID,
    expense_id UUID,
    amount DECIMAL,
    category STRING,
    expense_date STRING,
    expense_location STRING,
    special_note STRING,
    payment_method STRING,
    PRIMARY KEY(user_id, expense_id)
);