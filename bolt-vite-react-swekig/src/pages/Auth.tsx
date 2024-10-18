import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthProps {
  onLogin: (email: string, password: string) => boolean
  onSignup: (name: string, email: string, password: string) => boolean
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      if (formData.email && formData.password) {
        const success = onLogin(formData.email, formData.password)
        if (success) {
          navigate('/customer-panel')
        } else {
          setError('Invalid email or password')
        }
      } else {
        setError('Please fill in all fields')
      }
    } else {
      if (formData.name && formData.email && formData.password) {
        const success = onSignup(formData.name, formData.email, formData.password)
        if (success) {
          navigate('/customer-panel')
        } else {
          setError('Email already in use')
        }
      } else {
        setError('Please fill in all fields')
      }
    }
  }

  // ... rest of the component remains the same
}

export default Auth