export default (config: any) => {

    const pages: any[] = []
    
    pages.push({
        slug: config.adminPrefix ?? 'admin',
        title: 'Admin Panel',
        layout: config.layout,
        modules: [] // Dashboard
    });
    return {
        pages
    }
}
