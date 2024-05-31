import {useState, useEffect} from 'react';
import {Flex, Form, Layout, Statistic} from 'antd';
import {Content, Header} from 'antd/es/layout/layout';
import {getPeople} from './services/peopleService';

import EditableTable from './components/EditableTable';
import FeedbackErrorContainer from './components/FeedbackErrorContainer';
import Searchbar from './components/Searchbar';
import CreateButton from './components/CreateButton';

function App() {
    const [dataSource, setDataSource] = useState([]);
    const [errors, setErrors] = useState([]);
    const [creatingRecord, setCreatingRecord] = useState(false);
    const [maxKey, setMaxKey] = useState(0);
    const [form] = Form.useForm();
    const [editingRow, setEditingRow] = useState(null);

    useEffect(() => {
        getPeople(setDataSource, setMaxKey);
    }, []);

    return (
        <Layout style={{backgroundColor: 'inherit'}}>
            <Header style={{background: 'white', textAlign: 'center', fontSize: '2rem'}}>People Registration</Header>
            <Content style={{marginTop: '5rem', overflowX: 'auto'}}>
                <Flex
                    vertical
                    gap={'1rem'}
                    style={{
                        width: '65rem',
                        margin: 'auto',
                        padding: '2rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'white',
                    }}>
                    <Flex align="center" justify="space-between">
                        <CreateButton
                            form={form}
                            maxKey={maxKey}
                            setCreatingRecord={setCreatingRecord}
                            dataSource={dataSource}
                            setDataSource={setDataSource}
                            editingRow={editingRow}
                            setEditingRow={setEditingRow}
                            setMaxKey={setMaxKey}
                        />
                        <Searchbar setDataSource={setDataSource} setMaxKey={setMaxKey} editingRow={editingRow} />
                        <Statistic title="Total" value={dataSource.length} />
                    </Flex>
                    <FeedbackErrorContainer errors={errors} />
                    <EditableTable
                        form={form}
                        dataSource={dataSource}
                        setDataSource={setDataSource}
                        creatingRecord={creatingRecord}
                        setCreatingRecord={setCreatingRecord}
                        maxKey={maxKey}
                        setMaxKey={setMaxKey}
                        setErrors={setErrors}
                        editingRow={editingRow}
                        setEditingRow={setEditingRow}
                    />
                </Flex>
            </Content>
        </Layout>
    );
}

export default App;
