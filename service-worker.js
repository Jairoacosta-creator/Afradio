<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="content="width=device-width, initial-scale=1.0">
    <title>AFRadio - En Vivo</title>
    <!-- ⭐️ PWA REQUIREMENT 1: Enlace al manifiesto para iconos e instalación ⭐️ -->
    <link rel="manifest" href="afradio-manifest.json">
    
    <!-- Carga de Tailwind CSS para estilos -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Fuente Inter de Google Fonts y fondo oscuro */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;700;900&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            
            /* 1. FONDO INTERACTIVO (Gradiente animado) */
            background: linear-gradient(-45deg, #111827, #1f2937, #0f172a);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Animación de rotación para el logo/disco */
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        /* Clase permanente para que el logo siempre esté girando */
        .spinner-disk {
            animation: rotate 6s linear infinite;
        }
        
        /* Estilo para el botón de Compartir */
        #share-btn {
            background-color: #3b82f6; /* Azul */
            transition: all 0.3s ease-in-out;
            box-shadow: 0 5px 25px rgba(59, 130, 246, 0.5); 
        }
        #share-btn:active {
            box-shadow: 0 3px 15px rgba(59, 130, 246, 0.7);
            transform: translateY(1px);
        }
    </style>
