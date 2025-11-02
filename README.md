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
6d9ab19 (HEAD -> main) test(GREEN): fix Sweet purchase test by adding required added_by field- Provided admin user as 'added_by' when creating Sweet instance.- All tests now pass successfully.Co-authored-by: ChatGPT <noreply@openai.com>
414b6ba test(RED): add failing test for Sweet purchase logic- Added test case to check quantity decreases after purchase.- Test fails because 'added_by' foreign key is missing.- Confirms that validation is working.Co-authored-by: ChatGPT <noreply@openai.com>
20e254c Initial commit - setup Sweet Shop backend structure

## SCREENSHOTS




