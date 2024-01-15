type DefaultLayoutProps = {
    children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <>
            <div className=''>
                {children}
            </div>
        </>
    );
};
export default DefaultLayout;
