import { useQuery } from 'react-query';
import { getMainHisoryArticle } from '../api/getMainHistoryArticle';

const useMainHistory = (userEmail: string) => {
    const { data, isLoading, isError } = useQuery(
        ['mainHistory', userEmail],
        () => getMainHisoryArticle(userEmail),
        {
            enabled: !!userEmail,
        }
    );

    return { data, isLoading, isError };
};

export default useMainHistory;
    

    

