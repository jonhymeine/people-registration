import {CheckOutlined, DeleteFilled, EditFilled} from '@ant-design/icons';
import {Button, DatePicker, Form, Input, Select, Table} from 'antd';
import {useState} from 'react';
import moment from 'moment';
import {createPerson, deletePerson, updatePerson} from '../services/peopleService';

function EditableTable({
    form,
    dataSource,
    setDataSource,
    creatingRecord,
    setCreatingRecord,
    maxKey,
    setMaxKey,
    setErrors,
    editingRow,
    setEditingRow,
}) {
    const onFormFinish = async record => {
        try {
            await form.validateFields();
            setErrors([]);
            const newValues = form.getFieldsValue();
            const newDataSource = dataSource.map(person => {
                if (person.key === record.key) {
                    return {...newValues, key: person.key, id: person.id};
                } else {
                    return person;
                }
            });
            if (creatingRecord) {
                const response = await createPerson({
                    ...newValues,
                    birthdate: newValues.birthdate.format('YYYY-MM-DD'),
                });
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const responseJson = await response.json();
                newDataSource[0].id = responseJson.id;

                setCreatingRecord(false);
                setEditingRow(null);
                setDataSource(newDataSource);
                return;
            }

            const response = await updatePerson({
                ...newValues,
                id: record.id,
                key: record.key,
                birthdate: newValues.birthdate.format('YYYY-MM-DD'),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }
            setEditingRow(null);
            setDataSource(newDataSource);
        } catch (error) {
            if (error.errorFields) {
                const newErrors = error.errorFields.map(({name}) => ({name: `${name[0]} is required.`}));
                setErrors(newErrors);
            } else {
                setErrors([{name: error.message}]);
            }
        }
    };

    const onDelete = async id => {
        try {
            const response = await deletePerson(id);
            if (!response.ok) {
                throw new Error('Failed to delete person');
            }
            setDataSource(dataSource.filter(person => person.id !== id));
            setEditingRow(null);
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '14rem',
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item name={'name'} rules={[{required: true}]} noStyle style={{margin: 'auto'}}>
                            <Input />
                        </Form.Item>
                    );
                }
                return text;
            },
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
            width: '9rem',
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item name={'cpf'} rules={[{required: true}]} noStyle style={{margin: 'auto'}}>
                            <Input />
                        </Form.Item>
                    );
                }
                return text;
            },
        },
        {
            title: 'RG',
            dataIndex: 'rg',
            key: 'rg',
            width: '8rem',
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item name={'rg'} rules={[{required: true}]} noStyle style={{margin: 'auto'}}>
                            <Input />
                        </Form.Item>
                    );
                }
                return text;
            },
        },
        {
            title: 'Birthdate',
            dataIndex: 'birthdate',
            key: 'birthdate',
            align: 'center',
            width: '9rem',
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item name={'birthdate'} rules={[{required: true}]} noStyle style={{margin: 'auto'}}>
                            <DatePicker format={'DD/MM/YYYY'} />
                        </Form.Item>
                    );
                }
                const date = new Date(text);
                const userTimezoneOffset = date.getTimezoneOffset() * 60000;
                return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString();
            },
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            align: 'center',
            width: '5rem',
            render: (text, record) => {
                if (editingRow === record.key) {
                    return (
                        <Form.Item name={'gender'} rules={[{required: true}]} noStyle style={{margin: 'auto'}}>
                            <Select options={selectGenderOptions} style={{minWidth: '3.5rem'}} />
                        </Form.Item>
                    );
                }
                return text;
            },
        },
        {
            title: 'Edit',
            key: 'edit',
            align: 'center',
            width: '5rem',
            render: (_, record) => {
                if (editingRow === record.key) {
                    return (
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{backgroundColor: '#588157'}}
                            onClick={() => onFormFinish(record)}>
                            <CheckOutlined style={{fontSize: '1.25rem'}} />
                        </Button>
                    );
                } else {
                    const date = new Date(record.birthdate);
                    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
                    const finalDate = new Date(date.getTime() + userTimezoneOffset);
                    return (
                        <Button
                            type="primary"
                            disabled={editingRow !== null && editingRow !== record.key ? true : false}
                            onClick={() => {
                                setEditingRow(record.key);
                                form.setFieldsValue({
                                    name: record.name,
                                    cpf: record.cpf,
                                    rg: record.rg,
                                    birthdate: moment(finalDate),
                                    gender: record.gender,
                                });
                            }}>
                            <EditFilled style={{fontSize: '1.25rem'}} />
                        </Button>
                    );
                }
            },
        },
        {
            title: 'Delete',
            key: 'delete',
            align: 'center',
            width: '5rem',
            render: (_, record) => {
                if (creatingRecord && record.key === maxKey - 1) {
                    return (
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                setDataSource(dataSource.filter(person => person.key !== record.key));
                                setCreatingRecord(false);
                                setEditingRow(null);
                                setErrors([]);
                            }}>
                            <DeleteFilled style={{fontSize: '1.25rem'}} />
                        </Button>
                    );
                } else {
                    return (
                        <Button
                            type="primary"
                            danger
                            onClick={() => onDelete(record.id)}
                            disabled={editingRow !== null && editingRow !== record.key ? true : false}>
                            <DeleteFilled style={{fontSize: '1.25rem'}} />
                        </Button>
                    );
                }
            },
        },
    ];

    const selectGenderOptions = [
        {value: 'M', label: 'M'},
        {value: 'F', label: 'F'},
    ];

    return (
        <Form form={form}>
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                style={{width: '100%'}}
                scroll={{y: '50vh'}}
            />
        </Form>
    );
}

export default EditableTable;
