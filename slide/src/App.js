import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function App() {
    const { handleSubmit, register, formState: { errors } } = useForm({mode: 'onChange'});

    const onSubmit = (data) => {
        console.log(data);
    }
    const getMinDate = () => {
        let data = new Date()
        data.setFullYear(data.getFullYear() - 18)
        return data
    }
    
    return (
        <div className='col-md mx-auto'>
            <Container fluid className='p-5'>
                <Form noValidate validated={!errors} onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                id="fullName"
                                isInvalid={errors.fullName}
                                isValid={!errors.fullName}
                                required
                                placeholder="Insira seu nome completo"
                                {...register('fullName', {
                                    required: 'Nome Completo é obrigatório'
                                })}
                            />
                            {errors.fullName && <Form.Control.Feedback type="invalid">{errors.fullName.message}</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                id="email"
                                required
                                isInvalid={errors.email}
                                isValid={!errors.email}
                                placeholder="Insira seu e-mail"
                                {...register('email', {
                                    required: 'E-mail é obrigatório',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'E-mail inválido'
                                    }
                                })}
                            />
                            {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group as={Col} sm className='mb-3'>
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type='date'
                                name="date"
                                id="date"
                                required
                                isInvalid={errors.date}
                                isValid={!errors.date}
                                placeholder="Insira sua data de nascimento"
                                {...register('date', {
                                    required: {
                                        value: true,
                                        message: 'Data de nascimento é obrigatória'
                                    },  
                                    max: {
                                        value: getMinDate(),
                                        message: "Idade minima: 18 anos"
                                    } 
                                })}
                            />
                            
                            {errors.date && <Form.Control.Feedback type="invalid">{errors.date.message}</Form.Control.Feedback>}
                            
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} className="mb-5">
                        <Form.Check type="checkbox" label="Condordo com os termos de serviço." 
                        name="checkbox"
                        id="checkbox"
                        defaultChecked 
                        {...register('checkbox', {
                          required: {
                              value: true,
                              message: 'Concorde para registrar-se'
                          },
                      })}
                        />
                    </Form.Group>
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Container>
        </div>
    );
}
