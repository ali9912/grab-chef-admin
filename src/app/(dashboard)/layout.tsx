import NavbarComp from '@/common/components/navbar/app-navbar';
import { AppSidebar } from '@/common/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomersProvider } from '@/common/contexts/CustomersContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CustomersProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full overflow-x-hidden bg-[#FBFBFB]'>
          <NavbarComp />
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </CustomersProvider>
  );
}
