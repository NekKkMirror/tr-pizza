import { config } from '@CNF'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizzaPage: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  const { id: pizzaId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPizzas = async () => {
      const { MOCK_API_SECRET } = config
      const apiVersion: string = 'api/v1'
      const url: string = `https://${MOCK_API_SECRET}.mockapi.io/${apiVersion}/pizzaz/${pizzaId}`

      try {
        const { data } = await axios.get(url)

        setPizza(data)
      } catch (error: unknown) {
        alert('Ошибка при получении пиццы')

        navigate('/')
      }
    }

    fetchPizzas().then((): void => {})
  }, [])

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className='container'>
      <img alt={pizza.title} src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to='/'>
        <button className='button button--outline button--add'>
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizzaPage
