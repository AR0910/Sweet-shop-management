#  Sweet Shop Management System

##  Overview
The **Sweet Shop Management System** is a full-stack web application designed to manage sweets inventory, user authentication, and purchase operations for a sweet shop.  
It allows customers to view and purchase sweets, while admin users can add, update, delete, and restock sweets.  

The project demonstrates key software engineering concepts such as **RESTful API design**, **token-based authentication**, **Test-Driven Development (TDD)**, **clean coding practices**, and **AI-assisted software development workflows**.

---

##  Core Features

### Backend (Django REST Framework)
- User registration and JWT authentication (`/api/auth/register`, `/api/auth/login`)
- CRUD operations for sweets (`/api/sweets/`)
- Search sweets by name, category, or price (`/api/sweets/search/`)
- Purchase sweets (decrease quantity)
- Restock sweets (admin only)
- Role-based permissions (normal user vs admin)
- Test suite using Django’s `TestCase`

### Frontend (React)
- Login & registration pages
- Dashboard displaying all sweets
- Search and filter sweets by category or price
- “Purchase” button disabled when stock = 0
- Admin-only “Add”, “Edit”, and “Delete” options
- Responsive design with simple UI/UX

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | Python, Django, Django REST Framework |
| **Authentication** | JWT (SimpleJWT) |
| **Database** | SQLite3 |
| **Frontend** | React.js, Axios, Bootstrap |
| **Testing** | Django `unittest` / `TestCase` |
| **Version Control** | Git, GitHub |
| **AI Tools Used** | ChatGPT (OpenAI GPT-5) |

---

## ⚙️ Project Workflow

1. **Test-Driven Development (TDD)** — Followed the **Red → Green → Refactor** pattern:
   - 🟥 **RED:** Wrote failing tests for sweet purchase logic.
   - 🟩 **GREEN:** Implemented backend logic to pass tests.
   -  **REFACTOR:** Cleaned up and optimized code for maintainability.

2. **Git Version Control:** Each phase was committed with descriptive messages and AI co-authorship.

3. **Clean Coding Practices:**  
   - Followed PEP8 standards  
   - Added comments, docstrings, and meaningful variable names  
   - Applied separation of concerns between models, serializers, and views

---


## Folder Structure
sweet_shop/
├── backend/
│ ├── manage.py
│ ├── sweetshop_api/
│ │ ├── settings.py
│ │ ├── urls.py
│ └── sweets/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── tests.py
│ └── urls.py
└── frontend/
├── src/
│ ├── components/
│ │ ├── Dashboard.js
│ │ ├── SweetItem.js
│ │ ├── AddEditSweet.js
│ │ ├── Login.js
│ │ └── Register.js
│ ├── api.js
│ └── App.js


---

## 🚀 Setup and Run Instructions

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/sweet-shop.git
cd sweet-shop/backend
```
### 🔹 2. Setup the Backend (Django)
create a virutal environment and install dependencies:
```bash
python -m venv venv
venv\Scripts\activate          # (Windows)
# or source venv/bin/activate  # (Mac/Linux)

pip install -r requirements.txt
```
run the migrations:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
create an admin user:
-       python manage.py createsuperuser

### 🔹 3. Setup the Frontend (React)   
in another terminal, run:
-      cd ../frontend
      npm install
      npm start

### 🔹4. run the test  
-      python manage.py test
For coverage report:
-      pip install coverage
      coverage run manage.py test
      coverage report -m


## Test-Driven Development (TDD)

This project follows the Red-Green-Refactor workflow for backend logic.

Stage	Description	Git Commit Example
🔴 RED	
    -  Write a failing test first to define desired behavior	
    -  test: add failing tests for Sweet purchase (RED)
🟢 GREEN	
    - Implement minimal code to make the test pass	
    - fix: provide 'added_by' user in Sweet creation test (GREEN)
🧩 REFACTOR	
    - Clean up and optimize code without changing behavior	
    - refactor: simplify Sweet test setup and improve readability

view commit:
-      git log --oneline

# my commit output:
**check in the commit history tab**

## SCREENSHOTS
has two folder - user and admin
#user:
- login
- dashboard
- search sweet
- purchase option - where the quantity decreases before and after the purchase is done

#admin:
- login
- dashboard
- add,edit,delete sweet option

## my AI-usage:
AI Tools Used

ChatGPT (OpenAI GPT-5)

🔸 How AI Was Used

Used ChatGPT to:

Assisted in generating Django code for authentication and CRUD.

Debug IntegrityError and refine TDD test structure.

Write React frontend logic for dashboard and search filters.

🔸 Reflection on AI Impact

AI tools significantly improved my development speed and confidence in structuring the project.
It helped me understand best practices in REST API design, clean code structuring, and testing workflows.
I maintained ownership by verifying and modifying all generated code to ensure correctness, readability, and maintainability.

## Test report:
- my output report, after running the following command
-      coverage report -m                                                       
| File                                                                                   | Stmts   | Miss   | Cover   | Missing                              |
| -------------------------------------------------------------------------------------- | ------- | ------ | ------- | ------------------------------------ |
| manage.py                                                                              | 11      | 2      | 82%     | 12-13                                |
| sweets/**init**.py                                                                     | 0       | 0      | 100%    | —                                    |
| sweets/admin.py                                                                        | 6       | 0      | 100%    | —                                    |
| sweets/apps.py                                                                         | 4       | 0      | 100%    | —                                    |
| sweets/migrations/0001_initial.py                                                      | 7       | 0      | 100%    | —                                    |
| sweets/migrations/0002_sweet_created_at_sweet_description_sweet_updated_at_and_more.py | 7       | 0      | 100%    | —                                    |
| sweets/migrations/0003_alter_sweet_added_by_alter_sweet_category_and_more.py           | 6       | 0      | 100%    | —                                    |
| sweets/migrations/**init**.py                                                          | 0       | 0      | 100%    | —                                    |
| sweets/models.py                                                                       | 20      | 3      | 85%     | 19, 33-34                            |
| sweets/permissions.py                                                                  | 9       | 4      | 56%     | 10-12, 16                            |
| sweets/serializers.py                                                                  | 16      | 0      | 100%    | —                                    |
| sweets/tests.py                                                                        | 43      | 1      | 98%     | 64                                   |
| sweets/urls.py                                                                         | 4       | 0      | 100%    | —                                    |
| sweets/views.py                                                                        | 78      | 35     | 55%     | 20-21, 53-56, 63-87, 97, 99, 108-113 |
| sweetshop_api/**init**.py                                                              | 0       | 0      | 100%    | —                                    |
| sweetshop_api/settings.py                                                              | 23      | 0      | 100%    | —                                    |
| sweetshop_api/urls.py                                                                  | 7       | 1      | 86%     | 8                                    |
| **TOTAL**                                                                              | **241** | **46** | **81%** | —                                    |


## added the git commit for AI co-author
** added Chatgpt as AI co-author using git commit**
