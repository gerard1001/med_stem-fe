import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const links = [
  { name: 'Landing', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Schedule', path: '/dashboard/schedule' }
];

function DashboardNavBar() {
  return (
    <Box className="py-4 px-8 flex flex-row justify-between border bottom-1">
      <Typography>Igicupuri</Typography>
      <Stack direction="row" gap={1}>
        {links.map(({ name, path }) => (
          <Link key={name} to={path}>
            {name}
          </Link>
        ))}
      </Stack>
    </Box>
  );
}

export default DashboardNavBar;
