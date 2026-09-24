'use client'

import { LoadingOutlined } from '@ant-design/icons';
import { Flex,Spin } from 'antd';

export default function Loading() {
    return (
        <Flex justify="center" align="center" className="min-h-[60vh]">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 300 }} spin />} />
        </Flex>
    )
}