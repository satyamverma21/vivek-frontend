import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  WaterDrop as WaterDropIcon,
  Thermostat as ThermostatIcon,
  Water as WaterIcon,
} from '@mui/icons-material';

interface Parameter {
  value: number;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [moisture, setMoisture] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated data for now
        setMoisture(65);
        setTemperature(25);
        setHumidity(60);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const ParameterCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    unit: string;
    threshold: number;
    color: string;
  }> = ({ title, value, icon, unit, threshold, color }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              p: 1,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="p" sx={{ mb: 1 }}>
          {value} {unit}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Threshold: {threshold} {unit}
        </Typography>
        {value > threshold && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: 'white' }}>
              !
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: '#2e7d32',
            textAlign: 'center',
          }}
        >
          Plant Monitoring Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ParameterCard
              title="Soil Moisture"
              value={moisture}
              icon={<WaterDropIcon sx={{ color: 'white' }} />}
              unit="%"
              threshold={70}
              color="#2e7d32"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ParameterCard
              title="Temperature"
              value={temperature}
              icon={<ThermostatIcon sx={{ color: 'white' }} />}
              unit="°C"
              threshold={30}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ParameterCard
              title="Humidity"
              value={humidity}
              icon={<WaterIcon sx={{ color: 'white' }} />}
              unit="%"
              threshold={80}
              color="#9c27b0"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 