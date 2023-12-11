# FolderMonitor Setup 1.0.0

## Overview

FolderMonitor is a desktop application that allows users to monitor directories, view the count of subdirectories, and read text files within those directories.

## Installation

1. Download the latest release from the [releases page](https://github.com/your-username/your-repo/releases).

2. Run the `FolderMonitor Setup 1.0.0.exe` file.

3. Follow the installation wizard to install FolderMonitor on your computer.

## Getting Started

1. Launch FolderMonitor after installation. The application will automatically open a dialog box.

2. In the dialog box, select the directory you want to monitor. By default, the dialog opens in the installation directory of the application.

3. Click on subdirectories to view the count of subdirectories inside them.

4. Explore and read text files within the selected directory.

## Directory Monitoring

- Changes within the selected directory, such as adding, deleting, or modifying files, will be automatically monitored.

- The application will emit real-time events to indicate directory changes.


## Technology Stack

- Electron version: ^=28.0.0
- **Backend:**
  - Node.js(>=18.5.0)
  - Express
  - Socket.io
  - Chokidar

- **Frontend:**
  - React (v18.2.0)
  - Bootstrap
  - Socket.io-client
  - Axios

## Installation

### Prerequisites

- Node.js (https://nodejs.org/)
- npm (Node Package Manager, comes with Node.js installation)

### Steps

1. **Clone the Repository:**
    git clone from repository
    cd folder-monitor

2. **Install Dependencies:**

  **Install backend and frontend dependencies.**
    Goto project root directory then run following commands on by one:
    npm install
    cd frontend
    npm install
    npm run build

3. **Run the Application:**
    Start the Electron application using command below.
    npm start
    This will launch the Electron app. Select a directory to monitor, and you're good to go!

4. **Building the App (Production Build)**
    Use below commands to create a production build of the Electron app:
    npm run dist
    Find the installer in the dist directory.
