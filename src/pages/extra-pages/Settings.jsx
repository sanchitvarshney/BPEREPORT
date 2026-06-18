import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, Divider, Alert } from '@mui/material';
import { getStoredApiBaseUrl, setApiBaseUrl, getApiBaseUrl } from 'utils/apiSettings';
import { getStoredSocketUrl, setSocketUrl, getSocketUrl } from 'utils/socketSettings';
import { socketService } from 'services/socket/SocketService';
import { showToast } from 'utils/ToastProvider';

const DEFAULT_API_PLACEHOLDER = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'https://your-api.example.com';
const DEFAULT_SOCKET_PLACEHOLDER = import.meta.env.VITE_SOCKET_URL || 'https://your-socket.example.com';

export default function Settings() {
  const [apiUrl, setApiUrlState] = useState('');
  const [socketUrl, setSocketUrlState] = useState('');
  const [apiActive, setApiActive] = useState('');
  const [socketActive, setSocketActive] = useState('');

  useEffect(() => {
    setApiUrlState(getStoredApiBaseUrl());
    setSocketUrlState(getStoredSocketUrl());
    setApiActive(getApiBaseUrl());
    setSocketActive(getSocketUrl());
  }, []);

  const handleApiSave = () => {
    setApiBaseUrl(apiUrl);
    const effective = getApiBaseUrl();
    setApiActive(effective);
    showToast(apiUrl.trim() ? 'API base URL saved.' : 'Custom API URL cleared. Using default.', 'success');
  };

  const handleApiClear = () => {
    setApiUrlState('');
    setApiBaseUrl('');
    setApiActive(getApiBaseUrl());
    showToast('Using default API URL from environment.', 'success');
  };

  const handleSocketSave = () => {
    setSocketUrl(socketUrl);
    const effective = getSocketUrl();
    setSocketActive(effective);
    socketService.refreshConnection();
    showToast(socketUrl.trim() ? 'Socket URL saved. Reconnecting...' : 'Custom socket URL cleared. Using default.', 'success');
  };

  const handleSocketClear = () => {
    setSocketUrlState('');
    setSocketUrl('');
    setSocketActive(getSocketUrl());
    socketService.refreshConnection();
    showToast('Using default socket URL from environment.', 'success');
  };

  return (
    <div style={{ padding: '24px', maxWidth: 680 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Connection Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Override the default API and socket URLs. Leave empty to use values from environment.
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            API Base URL
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            All HTTP requests (login, reports, masters) will use this URL. Leave empty to use the default.
          </Typography>
          {getStoredApiBaseUrl() && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Custom API URL active: <strong>{apiActive}</strong>
            </Alert>
          )}
          <TextField
            fullWidth
            size="small"
            label="API Base URL"
            placeholder={DEFAULT_API_PLACEHOLDER}
            value={apiUrl}
            onChange={(e) => setApiUrlState(e.target.value)}
            helperText="e.g. http://localhost:3001 or https://api.example.com (no trailing slash)"
            sx={{ mb: 2 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="contained" onClick={handleApiSave}>Save</Button>
            <Button variant="outlined" color="error" onClick={handleApiClear}>Clear (use default)</Button>
          </div>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 3 }} />

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Socket URL
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Real-time features (report downloads, notifications) will use this socket server. Leave empty to use the default.
          </Typography>
          {getStoredSocketUrl() && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Custom socket URL active: <strong>{socketActive}</strong>
            </Alert>
          )}
          <TextField
            fullWidth
            size="small"
            label="Socket URL"
            placeholder={DEFAULT_SOCKET_PLACEHOLDER}
            value={socketUrl}
            onChange={(e) => setSocketUrlState(e.target.value)}
            helperText="e.g. http://localhost:3000 or wss://socket.example.com (no trailing slash)"
            sx={{ mb: 2 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="contained" onClick={handleSocketSave}>Save</Button>
            <Button variant="outlined" color="error" onClick={handleSocketClear}>Clear (use default)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
