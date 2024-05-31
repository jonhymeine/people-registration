import {PlusOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import dayjs from 'dayjs';

function CreateButton({
    maxKey,
    setMaxKey,
    dataSource,
    setDataSource,
    setCreatingRecord,
    editingRow,
    setEditingRow,
    form,
}) {
    const createRecord = () => {
        const newRecord = {
            key: maxKey,
            name: '',
            cpf: '',
            rg: '',
            birthdate: dayjs(),
            gender: '',
        };
        setDataSource([newRecord, ...dataSource]);
        setCreatingRecord(true);
        setEditingRow(newRecord.key);
        setMaxKey(maxKey + 1);
        form.setFieldsValue(newRecord);
    };

    return (
        <Button type="primary" onClick={() => createRecord()} disabled={editingRow !== null ? true : false}>
            <PlusOutlined style={{fontSize: '1.25rem'}} />
        </Button>
    );
}

export default CreateButton;
