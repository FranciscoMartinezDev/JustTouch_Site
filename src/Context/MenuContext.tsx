import { Category } from '@/Models/Category';
import { ContextChildren } from '@/Models/Interfaces/ContextChildren';
import { IMenuContext } from '@/Models/Interfaces/IMenuContext';
import { Menu } from '@/Models/Menu';
import { Product } from '@/Models/Product';
import { JustTouchClient } from '@/Services/Client';
import { createContext, FC, useContext, useState } from 'react';

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const useMenuContext = (): IMenuContext => {
    const context = useContext(MenuContext);
    if (!context) throw new Error('Menu Context not provided!');
    return context;
}

export const MenuProvider: FC<ContextChildren> = ({ children }) => {
    const [isMenuLoading, setIsMenuLoading] = useState<boolean>(false);
    const [menu, setMenu] = useState<Menu>(new Menu());
    const [category, setCategory] = useState<Category>(new Category({ products: [new Product()] }));
    const service = JustTouchClient.getInstance();

    const handler = (callback: (prev: Category) => Category) => {
        setCategory(callback);
    }

    const GetMenu = async () => {
        if (menu.categories.length < 1) {
            setIsMenuLoading(true);
            var data = await service.Get<Menu>("menu", "43EZhYNBeo");
            if (data.success) {
                setMenu(data.data);
                setIsMenuLoading(false);
                return;
            }
            setIsMenuLoading(false);
            alert('error');
        }
    }

    const AddCategory = async () => {

        const formData = new FormData();
        const list = category.products;
        formData.append('category', "asdsadsa");
        formData.append('categoryCode', "asdsadsa");
        formData.append('branchCode', category.branchCode = "43EZhYNBeo");

        list.map((p, i) => {
            formData.append(`products[${i}].name`, p.name);
            formData.append(`products[${i}].price`, p.price);
            formData.append(`products[${i}].description`, p.description);
            
            if (p.image != undefined && p.image[0].originFileObj != undefined) {
                formData.append(`products[${i}].image`, p.image[0].originFileObj);
            }
        })

        const response =  await service.Post<FormData, Category>('menu', 'NewCatalog', formData);
        if(response.success){
            alert('Hecho')
            return;
        }
        alert(response.error);
    }

    return (
        <MenuContext.Provider value={{
            isMenuLoading,
            handler,
            menu, category,
            GetMenu, AddCategory
        }}>
            {children}
        </MenuContext.Provider>
    )
}