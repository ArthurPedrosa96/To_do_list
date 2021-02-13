CREATE DATABASE tb_perntodo;

CREATE TABLE tb_todo(
    todo_id SERIAL PRIMARY KEY,
    desc_st VARCHAR(255),
    category_id INT,
    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
            REFERENCES tb_category(category_id)
);

CREATE TABLE tb_category(
    category_id SERIAL PRIMARY KEY,
    name_st VARCHAR(40)
);