import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { MainLayout, Board } from './components';
import { mockBoardDeployments } from './mocks/boardData';
import { useDeployedBoardContext } from './hooks';

const App: React.FC = () => {
  // Try to use real contract, fall back to mock data
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployments, setBoardDeployments] = useState<any[]>([]);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    // Check if we have real deployments
    const subscription = boardApiProvider.boardDeployments$.subscribe({
      next: (deployments) => {
        if (deployments && deployments.length > 0) {
          setBoardDeployments(deployments);
          setUseMock(false);
        } else {
          // No real deployments, use mock
          setUseMock(true);
          setBoardDeployments(mockBoardDeployments as any);
        }
      },
      error: () => {
        // If there's an error, use mock
        setUseMock(true);
        setBoardDeployments(mockBoardDeployments as any);
      }
    });

    return () => subscription.unsubscribe();
  }, [boardApiProvider]);

  const displayBoards = boardDeployments.length > 0 ? boardDeployments : mockBoardDeployments;

  return (
    <Box sx={{ background: '#000', minHeight: '100vh' }}>
      <MainLayout>
        {displayBoards.map((boardDeployment, idx) => (
          <div data-testid={`board-${idx}`} key={`board-${idx}`}>
            <Board boardDeployment$={boardDeployment} />
          </div>
        ))}
        <div data-testid="board-start">
          <Board />
        </div>
      </MainLayout>
    </Box>
  );
};

export default App;
