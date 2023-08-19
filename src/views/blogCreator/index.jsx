import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Button,
  TextareaAutosize,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
  Box,
  Container,
} from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CodeIcon from '@mui/icons-material/Code';
import { marked } from 'marked';

const containerStyle = {
  padding: '16px',
};

const editorStyle = {
  padding: '16px',
  border: '1px solid #ccc',
  minHeight: '200px',
  resize: 'vertical',
};

const dialogStyle = {
  width: '400px',
};

const GithubIssueEditor = () => {
  const [content, setContent] = useState('');
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const [codeContent, setCodeContent] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const editorRef = useRef(null);

  const applyStyle = (style) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const range = selection.getRangeAt(0);
    const newNode = document.createElement(style);
    newNode.textContent = selectedText;
    range.deleteContents();
    range.insertNode(newNode);
  };

  const handleBoldClick = () => {
    applyStyle('b');
  };

  const handleItalicClick = () => {
    applyStyle('i');
  };

  const handleImageInsert = () => {
    const imageUrl = prompt('Enter the image URL:');
    if (imageUrl) {
      const imageMarkdown = `![Image](${imageUrl})`;
      setContent(content + imageMarkdown);
    }
  };

  const handleCodeDialogOpen = () => {
    setIsCodeDialogOpen(true);
  };

  const handleCodeDialogClose = () => {
    setIsCodeDialogOpen(false);
  };

  const handleCodeInsert = () => {
    const codeBlock = '```' + codeContent + '```';
    setContent(content + codeBlock);
    setCodeContent('');
    setIsCodeDialogOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Issue Editor</Typography>
        </Toolbar>
      </AppBar>
      <Paper style={containerStyle}>
        <div>
          <IconButton onClick={handleBoldClick}>
            <FormatBoldIcon />
          </IconButton>
          <IconButton onClick={handleItalicClick}>
            <FormatItalicIcon />
          </IconButton>
          <IconButton onClick={handleImageInsert}>
            <InsertPhotoIcon />
          </IconButton>
          <IconButton onClick={handleCodeDialogOpen}>
            <CodeIcon />
          </IconButton>
        </div>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Edit" />
          <Tab label="Preview" />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <TextareaAutosize
            ref={editorRef}
            style={editorStyle}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <div
            style={{
              padding: '16px',
              border: '1px solid #ccc',
              minHeight: '200px',
              overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        </TabPanel>
      </Paper>
      <Dialog open={isCodeDialogOpen} onClose={handleCodeDialogClose}>
        {/* ... (same as before) */}
        <DialogTitle>Insert Code Block</DialogTitle>
        <DialogContent style={dialogStyle}>
          <DialogContentText>
            Enter your code snippet below:
          </DialogContentText>
          <textarea
            rows={10}
            style={{ width: '100%', fontFamily: 'monospace' }}
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCodeDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCodeInsert} color="primary">
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default GithubIssueEditor;
