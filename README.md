# ASK ME
---
## Description

An open platform for everyone where users can post questions or problems they face and seek answers or solutions from others. Users can publish their inquiries by selecting the type of problem or question.


## User Stories
- **As a new user**, I want to sign up using my email and password, so that I can create an account to interact with the platform.
- **As a registered user**, I want to sign in using my email and password, so that I can access my account.
- **As a logged-in user**, I want to:
  - Post a question with a title, description, and tags.
  - Edit my posted question to correct errors or add more information.
  - Delete my question if necessary.
  - Add an answer to a question.
  - Edit my answer to fix errors or provide better explanations.
  - Delete my answer if it’s no longer relevant or appropriate.
  - Add a comment to a question or answer.
  - Edit my comment to fix mistakes or clarify my input.
  - Delete my comment to remove unwanted content.
  - View questions categorised by tags to easily find topics of interest.

---

## Data Models
![ERD](assests/ERD.PNG)

---

## Wireframes
### 2. logo 
![Logo](https://github.com/user-attachments/assets/24b61437-36b2-455b-9ce8-f54c3a12b261)


### 2. Home Page
![Home Page Wireframe](https://github.com/user-attachments/assets/56867b0e-19d7-4309-8298-5899254f1ecb)


### 3. Questions Page
![](https://github.com/user-attachments/assets/3af73312-15a3-47ad-bf32-d214f671832f)



### 4. Question Details Page
![ign-Up Page Wireframe](https://github.com/user-attachments/assets/ecff8d11-7acd-4839-a9c2-9b4cbc7ec555)


### 5. Post New Question
![image (4)](https://github.com/user-attachments/assets/1621f7b2-9a46-4528-834e-f8be6e8e62c6)


---
## Technologys
1. React
2. jsx
3. Css
4. javaScript

---
## Pseudocode

### Signing Up
1. User provides email and password.
2. Validate email format and password strength.
3. Create a new user account in the database.
4. Confirm the account creation.

### Signing In
1. User provides email and password.
2. Check credentials against the database.
3. Create a session for the user.
4. Confirm login success.

### Posting a Question
1. Check if the user is logged in.
2. Accept title, description, and tags.
3. Save the question to the database, linked to the user ID.
4. Confirm successful posting.

### Editing a Question
1. Verify user ownership of the question.
2. Accept updated details.
3. Update the question in the database.
4. Confirm successful update or return an error if unauthorized.

### Deleting a Question
1. Verify user ownership of the question.
2. Remove the question from the database.
3. Confirm deletion or return an error if unauthorized.

### Adding an Answer
1. Check if the user is logged in.
2. Accept the answer content.
3. Save the answer to the database, linked to the question and user IDs.
4. Confirm successful addition.

### Editing an Answer
1. Verify user ownership of the answer.
2. Accept updated content.
3. Update the answer in the database.
4. Confirm successful update or return an error if unauthorized.

### Deleting an Answer
1. Verify user ownership of the answer.
2. Remove the answer from the database.
3. Confirm deletion or return an error if unauthorized.

### Adding a Comment
1. Check if the user is logged in.
2. Accept the comment content.
3. Save the comment to the database, linked to the relevant question/answer and user IDs.
4. Confirm successful addition.

### Editing a Comment
1. Verify user ownership of the comment.
2. Accept updated content.
3. Update the comment in the database.
4. Confirm successful update or return an error if unauthorized.

### Deleting a Comment
1. Verify user ownership of the comment.
2. Remove the comment from the database.
3. Confirm deletion or return an error if unauthorized.



### futur work 
1. Like button for post, comment and replay.
2. close the post so no more replays.
