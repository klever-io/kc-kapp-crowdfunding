import styled from 'styled-components'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, colors } from '@/styles/global'
import Button from '@/components/Button/Button'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import Link from 'next/link'
import { web } from '@klever/sdk-web'
import { useRouter } from 'next/router'
import { useSdk } from '@/contexts/useSdk'
import { formatAddress } from '@/utils/formatter'
import BarLink from '../BarLink'
import { toast } from 'sonner'

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL
const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL

const Appbar = () => {
  const [loading, setLoading] = useState(false)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const sdk = useSdk()
  const address = sdk.getAccount()

  const closeDrawer = () => setDrawerOpen(false)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      closeDrawer()
    }
  }, [])

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isDrawerOpen, handleClickOutside])

  const connectWallet = async () => {
    setLoading(true)

    try {
      if (typeof window === 'undefined' || !window.kleverWeb) {
        throw Error('Klever Extension not found')
      }

      await window.kleverWeb.initialize()
      const adrr = window.kleverWeb.getWalletAddress()
      if (!adrr) {
        throw Error('Cannot retrieve wallet address')
      }

      if (nodeUrl && proxyUrl) {
        web.setProvider({
          node: nodeUrl,
          api: proxyUrl,
        })
      } else {
        web.setProvider(window.kleverWeb.provider)
      }

      sdk.setAccount(adrr)
      toast.success('Successfully connected!')
    } catch (error) {
      toast.error('Error connecting wallet.')
    }

    setLoading(false)
  }

  return (
    <>
      <AppBar>
        <LeftContainer>
          <Link href="/">
            <View align="center" justify="center" width="140px" height="50px">
              <Image priority src={logo} alt="Logo" width="140" height="50" />
            </View>
          </Link>
        </LeftContainer>

        <UserSettings>
          <View
            width="100%"
            display="flex"
            flexDirection="row"
            justify="space-between"
          >
            {!address ? (
              <>
                <Button
                  hover
                  height="34px"
                  padding="8px 10px"
                  fontSize="14px"
                  fontWeight="700"
                  background={colors.primary}
                  border={`1px solid ${colors.primary}`}
                  borderRadius="4px"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              </>
            ) : (
              <>
                <BarLink
                  path={`/crowdfundings/${address}`}
                  name="My Crowdfundings"
                />
                <BarLink path="/create" name="Create" />

                <Button
                  hover
                  height="34px"
                  margin="0px 0px 0px 20px"
                  padding="8px 10px"
                  fontSize="14px"
                  fontWeight="700"
                  background={colors.primary}
                  border={`1px solid ${colors.primary}`}
                  borderRadius="4px"
                >
                  {formatAddress(address)}
                </Button>
              </>
            )}
          </View>
        </UserSettings>
        <HamburgerMenu
          onClick={e => {
            e.stopPropagation() // Stop event propagation
            setDrawerOpen(!isDrawerOpen)
          }}
          bgColor={colors.primary}
          isDrawerOpen={isDrawerOpen}
        >
          <div />
          <div />
          <div />
        </HamburgerMenu>
      </AppBar>
      <Overlay isOpen={isDrawerOpen} onClick={closeDrawer} />
      <SideDrawer isOpen={isDrawerOpen} ref={drawerRef}>
        {!address ? (
          <>
            <UserSettings inDrawer>
              <View
                width="100%"
                columnGap={'1rem'}
                display="flex"
                align="center"
                justify="center"
              >
                <>
                  <Button
                    hover
                    height="34px"
                    padding="8px 10px"
                    fontSize="14px"
                    fontWeight="700"
                    background={colors.primary}
                    border={`1px solid ${colors.primary}`}
                    borderRadius="4px"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </Button>
                </>
              </View>
            </UserSettings>
          </>
        ) : (
          <>
            <View
              width="100%"
              columnGap={'1rem'}
              display="flex"
              flexDirection="column"
              align="center"
              justify="center"
            >
              <BarLink
                path={`/crowdfundings/${address}`}
                name="My Crowdfundings"
                mobile
              />

              <BarLink path="/create" name="Create" mobile />

              <Button
                hover
                height="34px"
                margin="20pxpx 0px 0px 0px"
                padding="8px 10px"
                fontSize="14px"
                fontWeight="700"
                background={colors.primary}
                border={`1px solid ${colors.primary}`}
                borderRadius="4px"
              >
                {formatAddress(address)}
              </Button>
            </View>
          </>
        )}
      </SideDrawer>
    </>
  )
}

export default Appbar

export const AppBar = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: white;
  color: black;
  z-index: 3; // Ensure AppBar is above SideDrawer and Overlay
  position: relative;
  border-bottom: 1px solid lightgray;
`

export const NavLinks = styled.div<{ inDrawer?: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  ${props => props.inDrawer && `flex-direction: column;`}

  @media (max-width: 1200px) {
    display: ${props => (props.inDrawer ? 'flex' : 'none')};
  }
`

export const UserSettings = styled.div<{ inDrawer?: boolean }>`
  display: flex;

  ${props => props.inDrawer && `flex-direction: column;`}

  @media (max-width: 1200px) {
    width: 100%;

    display: ${props => (props.inDrawer ? 'flex' : 'none')};
  }
`

export const LeftContainer = styled.div`
  display: flex;
  width: 45%;
  max-width: 500px;
  align-items: end;
  justify-content: space-between;

  @media (max-width: 1200px) {
    width: 85%;
    column-gap: 0.5rem;
  }
`

export const HamburgerMenu = styled.div<{
  bgColor: string
  isDrawerOpen?: boolean
}>`
  display: none;
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 25px;
  margin-left: auto;
  @media (max-width: 1200px) {
    display: block;
    div {
      position: absolute;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: ${props => props.bgColor};
      transition: all 0.3s ease-in-out;
      &:nth-child(1) {
        top: ${props => (props.isDrawerOpen ? '10px' : '0')};
        transform: ${props =>
          props.isDrawerOpen ? 'rotate(135deg)' : 'rotate(0)'};
      }
      &:nth-child(2) {
        top: 10px;
        opacity: ${props => (props.isDrawerOpen ? '0' : '1')};
      }
      &:nth-child(3) {
        top: ${props => (props.isDrawerOpen ? '10px' : '20px')};
        transform: ${props =>
          props.isDrawerOpen ? 'rotate(-135deg)' : 'rotate(0)'};
      }
    }
  }
`

export const SideDrawer = styled.div<{ isOpen?: boolean }>`
  position: fixed;
  top: 20;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: white;
  color: white;
  padding: 1rem;
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 2; // to ensure it's above the overlay
`

export const Overlay = styled.div<{ isOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // black with 50% opacity
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 1; // to ensure it's below the side drawer
`
