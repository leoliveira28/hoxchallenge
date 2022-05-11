import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Router, useRouter } from "next/router";

export default function Home() {
    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);


    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userEmail = 'hox@hox.com'
    const userPassword = '123321'
    const router = useRouter()
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleLogin = (e) => {
        e.preventDefault()
        if(email === userEmail && password === userPassword) {
            router.push('/products')
        }
    }
    return (
    <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="purple.200"
        justifyContent="center"
        alignItems="center"
    >
        <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar bg="purple.500" />
            <Heading color="purple.700">Olá, seja bem vindo!</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
                <form onSubmit={handleLogin}>
                    <Stack
                        spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                    >
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<CFaUserAlt color="gray.300" />}
                                />
                                <Input type="email" placeholder="Email" onChange={handleEmail}/>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    children={<CFaLock color="gray.300" />}
                                />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Senha" onChange={handlePassword}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                        {showPassword ? "esconder" : "Mostrar"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            </FormControl>
                        <Button
                            borderRadius={2}
                            type="submit"
                            variant="solid"
                            colorScheme="purple"
                            width="full"
                            
                        >
                            Entrar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Stack>
    </Flex>
    )
}




