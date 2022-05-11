import {

  Box, Button, Flex, Text, VStack, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
} from '@chakra-ui/react'


import { useEffect, useState } from 'react'
import { InputForm } from '../components/Input'
import { api } from '../services/api'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
export const Home = () => {

  const [name, setName] = useState('')
  const [fabricatedAt, setFabricatedAt] = useState('')
  const [isPerishable, setIsPerishable] = useState(false)
  const [validUntil, setValidUntil] = useState('Produto não perecivel')
  const [price, setPrice] = useState(0)
  const [id, setId] = useState(null)


  const [products, setProducts] = useState([])

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [isInvalid, setIsInvalid] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  // useEffect(() => {
  //   api.get('/products').then(res => { setProducts(res.data) })
  // }, [])
  const handleUpdateList = () => {
    api.get('/products').then(res => { setProducts(res.data) })

  }

  useEffect(() => {
    api.get(`/products?_page=${currentPage}&_limit=3`).then(res => {setProducts(res.data) })
  }, [currentPage])
  
  const handleCreateProduct = async (e) => {
    e.preventDefault()
    if (!name || !fabricatedAt || !price) return

    try {
      const data = await api.get('/products')
      api.post('/products', {
        _id: data.data.length + 1,
        name: name,
        fabricatedAt: fabricatedAt,
        perishable: isPerishable,
        validUntil: validUntil,
        price: price
      })

    } catch (err) {
      console.log(err)
    }
    handleUpdateList()
    setName('')
    setFabricatedAt('')
    setIsPerishable(false)
    setValidUntil('')
    setPrice(0)
    setId('')
    setIsFormOpen(false)
  }

  const handleDeleteProduct = async (_id) => {
    try {
      await api.delete(`/products/${_id}`)
    } catch (err) {
      console.log(err)
    }
    handleUpdateList()

  }
  const handleUptadeProduct = async (e) => {
    e.preventDefault()
    if (!name || !fabricatedAt || !isPerishable || !validUntil || !price) return
    try {
      await api.put(`/products/${id}`, {
        name: name,
        fabricatedAt: fabricatedAt,
        perishable: isPerishable,
        validUntil: validUntil,
        price: price,
      })
    } catch (err) {
      console.log(err)
    }

    handleUpdateList()
    setName('')
    setFabricatedAt('')
    setIsPerishable(false)
    setValidUntil('')
    setPrice(0)
    setId(null)
    toogleFormState()
    setIsFormOpen(false)



  }
  const handleUpdateProductForm = (product) => {
    setName(product.name)
    setFabricatedAt(product.fabricatedAt)
    setIsPerishable(product.isPerishable)
    setValidUntil(product.validUntil)
    setPrice(product.price)
    setId(product._id)
    setIsFormOpen(true)

  }
  const toogleFormState = () => {
    setIsFormOpen(!isFormOpen)
  }
  function handleProductName(text) {
    setName(text)
  }

  const handleFabricatedAt = (text) => {
    setFabricatedAt(text)

  }

  const handleIsPerishable = (e) => {
    if (e === 'true') {
      setIsPerishable(true)
    } else {
      setIsPerishable(false)
    }
    
    
  }

  const handleValidUntil = (text) => {
    setValidUntil(text)
    if(new Date(fabricatedAt) <= new Date(validUntil)) {
      setIsInvalid(true)
     
  } 
  }
 
  
  const handlePrice = (text) => {
    setPrice(text)
  }

  const handleFilter = async (e) => {
    const selected = e.target.value
    try {
      const filter = await api.get(`/products/?_sort=${selected}&oder=desc`).then(response => setProducts(response.data))
    } catch (err) {
      console.log(err)
    }   
    
  }
const currencyBRL = (value) => {
  const formattedValue = parseFloat(value).toLocaleString(
    'pt-BR', 
    { style: 'currency', currency: 'BRL' }
  )

    return formattedValue;
};
const handleNextPage = () => {
  setCurrentPage(currentPage + 1)
}

const handlePreviousPage = () => {
  setCurrentPage(currentPage - 1)

}

  return (
    <>
    <Box margin="6">
      <Flex justifyContent="space-between" m="3">
        <Text color="black" fontSize="2xl" >Lista de produtos</Text>
        <Button colorScheme="purple" onClick={toogleFormState}>{isFormOpen ? '-' : '+'}</Button>
      </Flex>
      {isFormOpen && (
        <VStack w="50%" my="1rem" as='form' onSubmit={id ? e => handleUptadeProduct(e) : handleCreateProduct}>
          <InputForm name={'Nome do Produto'} value={name} type="text" onChange={e => handleProductName(e.target.value)} isRequired={true} />
          <InputForm name={'Data de fabricação'} value={fabricatedAt} type="date" onChange={e => handleFabricatedAt(e.target.value)} isRequired={true} />
          <FormControl marginY="8">
            <FormLabel as='legend'>Produto perecível?</FormLabel>
            <RadioGroup name="isPerishable" onChange={e => handleIsPerishable(e)} m="4">
              <Radio value='true' m="3">Sim</Radio>
              <Radio value='false' m="3">Não</Radio>
            </RadioGroup>
          </FormControl>
          {isPerishable && (
            <FormControl>
               <InputForm name={'Data de validade'} isInvalid={isInvalid} value={validUntil} type="date" onChange={e => handleValidUntil(e.target.value) }  />                  
            </FormControl>
            )}
           
          <InputForm name={'Preço'} type="number" value={price} onChange={e => handlePrice(e.target.value)} isRequired={true} />

          <Button alignSelf="flex-end" type="submit">{id ? 'Atualizar' : 'Cadastrar'}</Button>
        </VStack>
      )}
      <TableContainer my="4" >
        <Table variant='simple'>
          <TableCaption>Lista de produtos cadastrados</TableCaption>
          <Thead>
            <Tr bg="purple.300">
              <Th color="purple.900">Nome</Th>
              <Th color="purple.900">Data de fabricação</Th>
              <Th color="purple.900" isNumeric>Data de validade</Th>
              <Th color="purple.900" isNumeric>Preço</Th>
              <Th color="purple.900" isNumeric> 
               <Select placeholder='Filtrar por:' onClick={e => handleFilter(e)}>
                  <option value='price'>Preço</option>
                  <option value='fabricatedAt'>Data de fabricação</option>
                  <option value='validUntil'>Data de vencimento</option>
                </Select>
              </Th>

            </Tr>
          </Thead>
          <Tbody>
            {products.map(product => (
              <Tr justifyContent="center" key={product._id} >
                <Td >{product.name}</Td>
                <Td>{format(new Date(product.fabricatedAt), 'dd MMM yyyy', {
        locale: ptBR, 
        })}</Td>
                 <Td isNumeric>{product.validUntil === validUntil ? product.validUntil : format(new Date(product.validUntil), 'dd MMM yyyy', {
        locale: ptBR, 
        })}</Td> 
                <Td isNumeric>{currencyBRL(product.price)}</Td>
                <Td>
                  <Flex justifyContent="space-between">
                    <Button size="sm" bg="red.400" onClick={() => handleDeleteProduct(product._id)}>Remover</Button>
                    <Button size="sm" bg="yellow.400" onClick={() => handleUpdateProductForm(product)}>Alterar</Button>
                  </Flex>
                </Td>
            </Tr>
            ))}

          </Tbody>

        </Table>
     </TableContainer>
    
    <Flex  justifyContent='center'>
     <Button m='4' onClick={handlePreviousPage} colorScheme='purple'> Anterior </Button>
     <Button  m='4' onClick={handleNextPage} colorScheme='purple'> Proxima </Button>

    
    </Flex>
    
   

   </Box>
</>
  )

}

export default Home




