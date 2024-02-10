import { styled, Heading, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto', // Todo elemento pra direita mas pra isso é necessário colocar uma largura
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  // Somente a filhos desse componente e pagina e nao de imports
  [`>${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  // Somente a filhos desse componente e pagina e nao de imports
  [`>${Text}`]: {
    maskType: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
