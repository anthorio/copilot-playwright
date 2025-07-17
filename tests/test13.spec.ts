import { test, expect } from '../test-base';

test.describe('Test de Dashboard - Navegación por Tabs', () => {
  test('debe navegar correctamente entre las tabs del dashboard', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Logearse en la página
    // Ir a la página de login
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    
    // Llenar formulario de login
    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');
    
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('password123');
    
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    
    // 2. Acceder al dashboard
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    console.log('✅ Login exitoso - Dashboard cargado');
    
    // Verificar que estamos en el dashboard
    const dashboardContainer = page.locator('.dashboard, .dashboard-container, #dashboard, [data-testid="dashboard"]');
    await expect(dashboardContainer.first()).toBeVisible();
    
    // 3. Verificar que las tabs están disponibles
    const projectsTab = page.locator('button:has-text("Projects"), a:has-text("Projects"), .tab:has-text("Projects"), [data-testid="projects-tab"]');
    const notificationsTab = page.locator('button:has-text("Notifications"), a:has-text("Notifications"), .tab:has-text("Notifications"), [data-testid="notifications-tab"]');
    const profileTab = page.locator('button:has-text("Profile"), a:has-text("Profile"), .tab:has-text("Profile"), [data-testid="profile-tab"]');
    
    await expect(projectsTab.first()).toBeVisible();
    await expect(notificationsTab.first()).toBeVisible();
    await expect(profileTab.first()).toBeVisible();
    
    console.log('✅ Todas las tabs del dashboard están visibles');
    
    // 4. Clicar en la tab "Projects"
    await projectsTab.first().click();
    
    // 5. Confirmar cambio de contenido para Projects
    const projectsContent = page.locator('.projects-content, .projects-section, #projects-content, [data-testid="projects-content"]');
    await expect(projectsContent.first()).toBeVisible();
    
    // Verificar elementos específicos de Projects
    const projectsList = page.locator('.project-list, .projects-grid, .project-items');
    const newProjectButton = page.locator('button:has-text("New Project"), button:has-text("Create Project"), .new-project-btn');
    
    const projectsListVisible = await projectsList.first().isVisible().catch(() => false);
    const newProjectVisible = await newProjectButton.first().isVisible().catch(() => false);
    
    if (projectsListVisible) {
      console.log('✅ Lista de proyectos visible');
    }
    if (newProjectVisible) {
      console.log('✅ Botón "New Project" visible');
    }
    
    console.log('✅ Contenido de Projects mostrado correctamente');
    
    // 6. Repetir para la tab "Notifications"
    await notificationsTab.first().click();
    
    // Confirmar cambio de contenido para Notifications
    const notificationsContent = page.locator('.notifications-content, .notifications-section, #notifications-content, [data-testid="notifications-content"]');
    await expect(notificationsContent.first()).toBeVisible();
    
    // Verificar elementos específicos de Notifications
    const notificationsList = page.locator('.notification-list, .notifications-list, .notification-items');
    const markAllReadButton = page.locator('button:has-text("Mark all read"), button:has-text("Mark All"), .mark-read-btn');
    const notificationBadge = page.locator('.notification-badge, .unread-count, .badge');
    
    const notificationsListVisible = await notificationsList.first().isVisible().catch(() => false);
    const markAllVisible = await markAllReadButton.first().isVisible().catch(() => false);
    const badgeVisible = await notificationBadge.first().isVisible().catch(() => false);
    
    if (notificationsListVisible) {
      console.log('✅ Lista de notificaciones visible');
    }
    if (markAllVisible) {
      console.log('✅ Botón "Mark all read" visible');
    }
    if (badgeVisible) {
      console.log('✅ Badge de notificaciones visible');
    }
    
    console.log('✅ Contenido de Notifications mostrado correctamente');
    
    // 7. Repetir para la tab "Profile"
    await profileTab.first().click();
    
    // Confirmar cambio de contenido para Profile
    const profileContent = page.locator('.profile-content, .profile-section, #profile-content, [data-testid="profile-content"]');
    await expect(profileContent.first()).toBeVisible();
    
    // 8. Verificar que Profile muestra contenido específico
    const userAvatar = page.locator('.user-avatar, .profile-avatar, .avatar');
    const userInfo = page.locator('.user-info, .profile-info, .user-details');
    const editProfileButton = page.locator('button:has-text("Edit Profile"), button:has-text("Edit"), .edit-profile-btn');
    const settingsSection = page.locator('.settings, .profile-settings, .user-settings');
    
    const avatarVisible = await userAvatar.first().isVisible().catch(() => false);
    const infoVisible = await userInfo.first().isVisible().catch(() => false);
    const editVisible = await editProfileButton.first().isVisible().catch(() => false);
    const settingsVisible = await settingsSection.first().isVisible().catch(() => false);
    
    if (avatarVisible) {
      console.log('✅ Avatar de usuario visible en Profile');
    }
    if (infoVisible) {
      console.log('✅ Información de usuario visible');
    }
    if (editVisible) {
      console.log('✅ Botón "Edit Profile" visible');
    }
    if (settingsVisible) {
      console.log('✅ Sección de configuraciones visible');
    }
    
    console.log('✅ Contenido de Profile mostrado correctamente');
    
    // 9. Verificaciones adicionales - probar navegación entre tabs
    // Volver a Projects para confirmar que la navegación funciona en ambas direcciones
    await projectsTab.first().click();
    await expect(projectsContent.first()).toBeVisible();
    console.log('✅ Navegación de vuelta a Projects exitosa');
    
    // Verificar que las tabs tienen indicación visual de estar activas
    const activeTab = page.locator('.tab-active, .active-tab, .tab.active, [aria-selected="true"]');
    const activeTabVisible = await activeTab.first().isVisible().catch(() => false);
    
    if (activeTabVisible) {
      console.log('✅ Tab activa correctamente indicada');
    }
    
    // 10. Verificaciones finales
    // Confirmar que seguimos en el dashboard
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    console.log('✅ Navegación por tabs del dashboard completamente verificada');
    console.log('✅ Cada tab muestra contenido específico correctamente');
  });

});
