import React from "react";
import { Link } from "react-router-dom";  // Usamos Link para la navegación
import { Button, Container, Box } from "@mui/material"; // Material UI

const Home = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 5 }}>
        <h2>Bienvenido a la Aplicación</h2>
        <p>¡Esta es la página de inicio! Puedes acceder a las secciones de usuarios después de iniciar sesión.</p>
        
        {/* Botones de navegación */}
        <Box sx={{ marginTop: 3, display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Enlace para ir a la página de inicio de sesión */}
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            component={Link} 
            to="/signin" 
            sx={{ marginBottom: 2 }}
          >
            Iniciar sesión
          </Button>
          
          {/* Enlace para ir a la página de registro */}
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth 
            component={Link} 
            to="/register"
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
