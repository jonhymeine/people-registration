import {Flex, Input, Layout, Table} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content, Header} from 'antd/es/layout/layout';

const {Search} = Input;

function App() {
    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'CPF', dataIndex: 'cpf', key: 'cpf'},
        {title: 'RG', dataIndex: 'rg', key: 'rg'},
        {title: 'Birthdate', dataIndex: 'birthdate', key: 'birthdate'},
        {title: 'Gender', dataIndex: 'gender', key: 'gender'},
    ];
    const list = [
        {name: 'John Doe', cpf: '123.456.789-00', rg: '123456789', birthdate: '2000-01-01', gender: 'M'},
        {name: 'Jane Doe', cpf: '987.654.321-00', rg: '987654321', birthdate: '2000-01-01', gender: 'M'},
        {name: 'John Smith', cpf: '123.456.789-00', rg: '123456789', birthdate: '2000-01-01', gender: 'M'},
    ];
    return (
        <>
            <Layout>
                <Content>
                    <Flex vertical justify="center" align="center" style={{height: '100vh'}}>
                        <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{width: 200}}
                        />
                        <Table columns={columns} dataSource={list} />
                    </Flex>
                </Content>
            </Layout>
        </>
    );
}

export default App;
