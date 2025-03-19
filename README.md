# Todo App - Frontend (Client)

A modern todo application with three task types, drag-and-drop functionality, and recurrence management.

## Features
### Three Todo Types:

- 📝 Basic: Simple text-based tasks
- 📅 Dated: Tasks with specific due dates
- 🔄 Recurring: Automatically repeating tasks (daily/weekly)

### Core Functionality:

- Drag-and-drop reordering
- Mark tasks as complete
- Automatic cleanup of old completed tasks
- Responsive Material-UI design
- User authentication

### Special Features:

- Visual date picker for dated/recurring tasks
- Immediate feedback on actions
- Error handling and validation
- Persistent user preferences

## Technologies:

- React 18
- TypeScript
- Material-UI (MUI)
- React Beautiful DnD
- Axios
- React Datepicker

## Setup
### 1. Clone Repository
```
git clone https://github.com/Soulittude/todolistappclient.git
cd todolistappclient
```
### 2. Install Dependencies
```
npm install
```
### 3. Environment Setup
Create ```.env``` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```
### 4. Run Development Server
```
npm run dev
```
## Folder Structure
```
/src
├── api              # API service configuration
├── components       # Reusable UI components
├── context          # Auth context management
├── pages            # Application views
├── types            # TypeScript definitions
├── utils            # Utility functions
└── App.tsx          # Main application component
```
