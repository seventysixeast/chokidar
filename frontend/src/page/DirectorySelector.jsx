import React from 'react';

const DirectorySelector = ({ onDirectorySelect }) => {
  const isElectron = window && window.process && window.process.type;
alert('Is Electron:', isElectron);
//const { ipcRenderer } = electron;
//console.log('IPC Renderer:', ipcRenderer);

  const selectDirectory = async () => {
    if (window.require) {
      const electron = window.require('electron');
      const { ipcRenderer } = electron;

      if (ipcRenderer) {
        try {
          const selectedDirectory = await ipcRenderer.invoke('open-directory-dialog');
          onDirectorySelect(selectedDirectory);
        } catch (error) {
          console.error('Error selecting directory:', error);
        }
      } else {
        console.error('IPC Renderer is not available');
      }
    } else {
      console.error('Electron is not available');
    }
  };

  return (
    <div>
      <button onClick={selectDirectory}>Select Directory</button>
    </div>
  );
};

export default DirectorySelector;
