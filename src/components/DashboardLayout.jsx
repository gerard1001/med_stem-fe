import { Box, Drawer, useMediaQuery } from '@mui/material';
import React, { forwardRef } from 'react';
import DashboardNavBar from './DashboardNavBar';

const DashboardLayout = forwardRef((props, ref) => {
  const {
    content,
    leftSideBarContent,
    rightSideBarContent,
    rightSideBarVariant,
    leftSideBarVariant,
    leftSideBarWidth,
    leftSideBarOpen,
    leftSideBarOnClose,
    rightSideBarOpen,
    rightSideBarOnClose,
    rightSideBarWidth
  } = props;

  const isMobile = useMediaQuery('(max-width: 600px)');
  const defaultWidth = '300px';

  return (
    <Box>
      <DashboardNavBar />
      <Box>
        <Drawer
          anchor="left"
          open={leftSideBarOpen || true}
          onClose={(...e) => {
            leftSideBarOnClose && leftSideBarOnClose(...e);
          }}
          sx={{
            root: {
              width: leftSideBarWidth || defaultWidth
            }
          }}
          variant={leftSideBarVariant || isMobile ? 'temporary' : 'permanent'}
        >
          {leftSideBarContent}
        </Drawer>
        <Box>{content}</Box>
        <Drawer
          anchor="right"
          open={rightSideBarOpen || true}
          onClose={(...e) => {
            rightSideBarOnClose && rightSideBarOnClose(...e);
          }}
          sx={{
            root: {
              width: rightSideBarWidth || defaultWidth
            }
          }}
          variant={rightSideBarVariant || isMobile ? 'temporary' : 'permanent'}
        >
          {rightSideBarContent}
        </Drawer>
      </Box>
    </Box>
  );
});

export default DashboardLayout;
