const express = require('express');
const cors = require('cors');
const programasRoutes = require('./routes/programas');
const estudiantesRoutes = require('./routes/estudiantes');
const estudiantesActivosRoutes = require('./routes/estudiantes_activos');
const estudiantesEgresadosRoutes = require('./routes/estudiantes_egresados');
const estudiantesPotencialesRoutes = require('./routes/estudiantes_potenciales');
const estudiantesMoodleRoutes = require('./routes/estudiantes_moodle');
const inscripcionesRoutes = require('./routes/inscripciones');
const agentesRoutes = require('./routes/agentes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/programas', programasRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/estudiantes-activos', estudiantesActivosRoutes);
app.use('/api/estudiantes-egresados', estudiantesEgresadosRoutes);
app.use('/api/estudiantes-potenciales', estudiantesPotencialesRoutes);
app.use('/api/estudiantes-moodle', estudiantesMoodleRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);
app.use('/api/agentes', agentesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});