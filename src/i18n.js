import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                welcome: "Welcome to Fitness Tracker",
                journey_start: "Your journey to a healthier life starts here. Log your workouts, track your meals, and stay motivated!",
                about: "About",
                about_description: "Fitness Tracker is designed to help you achieve your fitness goals by tracking your workouts and meals. Stay on top of your fitness game with our easy-to-use tracking features and motivational tools.",
                dashboard: "Dashboard",
                dashboard_summary: "Here you can see a summary of your workouts and recipes.",
                workouts: "Workouts",
                no_workouts: "No workouts logged yet.",
                add_workout: "+ Add Workout",
                recipes: "Recipes",
                no_recipes: "No recipes logged yet.",
                add_recipe: "+ Add Recipe",
                workout_description: "Description",
                workout_duration: "Duration",
                recipe_type: "Type",
                calories: "Calories",
                welcome_back: "Welcome back",
                username: "Username",
                password: "Password",
                login: "Login",
                login_failed: "Failed to login",
                register: "Register",
                email: "Email",
                confirm_password: "Confirm Password",
                add_recipe: "Add Recipe",
                recipe_name: "Recipe Name",
                type: "Type",
                salad: "Salad",
                main: "Main",
                dessert: "Dessert",
                snack: "Snack",
                description: "Description",
                instructions: "Instructions",
                calories: "Calories",
                add_workout: "Add Workout",
                workout_name: "Workout Name",
                duration_minutes: "Duration (minutes)",
                exercises: "Exercises",
                muscle_group: "Muscle Group",
                sets: "Sets",
                reps: "Reps",
                edit_recipe: "Edit Recipe",
                save_changes: "Save Changes",
                edit_workout: "Edit Workout",
                update_workout: "Update Workout",
                select_type: "Select Type",
                workout_name: "Workout Name",
                exercise_details: "Exercise Details",
                exercise_name: "Exercise Name",
                sets: "Sets",
                reps: "Reps",
                loading: "Loading...",
                delete_recipe: "Delete Recipe",
                delete_workout: "Delete Workout",
                workout_not_found: "Workout not found",
                minutes: "minutes",
                loading_exercise_details: "Loading exercise details...",
                all_rights_reserved: "All rights reserved.",
                fitness_tracker_logo: "Fitness Tracker Logo",
                home: "Home",
                logout: "Logout",
                add_location: "Add Location",
                locations: "Locations",
                latitude: "Latitude",
                longitude: "Longitude",
                features_title: "Features",
                feature1: "Log your workouts",
                feature2: "Add your meals",
                feature3: "All the information for you physical progress in one place",
                feature4: "Stay motivated",
                testimonials_title: "What Our Users Say",
                testimonial1_text: "This app has completely transformed my fitness journey!",
                testimonial1_author: "John Doe",
                testimonial2_text: "I love the meal tracking feature. It keeps me on track with my diet.",
                testimonial2_author: "Jane Smith",
                cta_title: "Get Started Today!",
                cta_description: "Join now and take the first step towards a healthier you.",
                cta_button: "Sign Up Now",
                about: "About Us",
                about_description: "Fitness Tracker is your companion on your journey to a healthier life. Our platform helps you log workouts, track meals, and stay motivated.",
                mission_title: "Our Mission",
                mission_description: "To empower individuals to achieve their health and fitness goals through easy-to-use tracking tools and personalized support.",
                team_title: "Our Team",
                team_description: "Meet the dedicated team behind Fitness Tracker:",
                team_member1: "Vasil Velinov - Founder, Web developer & Personal trainer",
                contact_title: "Contact Us",
                contact_description: "We're here to help you. Reach out to us through any of the following methods:",
                contact_email: "Email",
                contact_phone: "Phone",
                contact_address: "Address",
                admin_link: "Admin panel",
                no_locations: "No locations"
            },
        },
        bg: {
            translation: {
                welcome: "Добре дошли във Fitness Tracker",
                journey_start: "Вашето пътуване към по-здравословен живот започва тук. Записвайте тренировките си, следете храненето си и останете мотивирани!",
                about: "За Fitness Tracker",
                about_description: "Fitness Tracker е създаден, за да ви помогне да постигнете фитнес целите си, като следите тренировките и храненията си. Останете на върха на фитнес играта си с нашите лесни за използване функции за проследяване и мотивационни инструменти.",
                dashboard: "Табло",
                dashboard_summary: "Тук можете да видите обобщение на вашите тренировки и рецепти.",
                workouts: "Тренировки",
                no_workouts: "Все още няма записани тренировки.",
                add_workout: "+ Добавете тренировка",
                recipes: "Рецепти",
                no_recipes: "Все още няма записани рецепти.",
                workout_description: "Описание",
                workout_duration: "Продължителност",
                recipe_type: "Тип",
                calories: "Калории",
                welcome_back: "Добре дошли отново",
                username: "Потребителско име",
                password: "Парола",
                login: "Вход",
                login_failed: "Неуспешен вход",
                register: "Регистрация",
                email: "Имейл",
                confirm_password: "Потвърдете паролата",
                add_recipe: "Добавете рецепта",
                recipe_name: "Име на рецепта",
                type: "Тип",
                salad: "Салата",
                main: "Основно ястие",
                dessert: "Десерт",
                snack: "Закуска",
                description: "Описание",
                instructions: "Инструкции",
                calories: "Калории",
                add_workout: "Добавете тренировка",
                workout_name: "Име на тренировка",
                duration_minutes: "Продължителност (минути)",
                exercises: "Упражнения",
                muscle_group: "Мускулна група",
                sets: "Серии",
                reps: "Повторения",
                edit_recipe: "Редактиране на рецепта",
                save_changes: "Запазете промените",
                edit_workout: "Редактиране на тренировка",
                update_workout: "Актуализиране на тренировка",
                select_type: "Изберете тип",
                workout_name: "Име на тренировка",
                exercise_details: "Детайли за упражнението",
                exercise_name: "Име на упражнението",
                sets: "Серии",
                reps: "Повторения",
                loading: "Зареждане...",
                delete_recipe: "Изтриване на рецепта",
                delete_workout: "Изтриване на тренировка",
                workout_not_found: "Тренировката не е намерена",
                minutes: "минути",
                loading_exercise_details: "Зареждане на детайли за упражнението...",
                all_rights_reserved: "Всички права запазени.",
                fitness_tracker_logo: "Лого на Fitness Tracker",
                home: "Начало",
                logout: "Изход",
                add_location: "Добавете локация",
                locations: "Локации",
                latitude: "Геогр. ширина",
                longitude: "Геогр. дължина",
                features_title: "Характеристики",
                feature1: "Записвайте тренировките",
                feature2: "Добавяйте храненията си",
                feature3: "Всичко необходимо на едно място",
                feature4: "Останете мотивирани",
                testimonials_title: "Какво казват нашите потребители",
                testimonial1_text: "Това приложение напълно преобрази моя фитнес път!",
                testimonial1_author: "Джон Доу",
                testimonial2_text: "Обичам функцията за проследяване на храната. Тя ме държи на път с диетата ми.",
                testimonial2_author: "Джейн Смит",
                cta_title: "Започнете днес!",
                cta_description: "Присъединете се сега и направете първата крачка към по-здравословен живот.",
                cta_button: "Регистрирайте се сега",
                about: "За нас",
                about_description: "Fitness Tracker е вашият спътник в пътуването ви към по-здравословен живот. Нашата платформа ви помага да записвате тренировки, следите храненето си и останете мотивирани.",
                mission_title: "Нашата мисия",
                mission_description: "Да вдъхновим хората да постигат своите здравни и фитнес цели чрез лесни за използване инструменти за проследяване и персонализирана подкрепа.",
                team_title: "Нашият екип",
                team_description: "Запознайте се с екипа зад Fitness Tracker:",
                team_member1: "Васил Велинов – Уеб девелопър и персонален коуч",
                contact_title: "Свържете се с нас",
                contact_description: "Ние сме тук, за да ви помогнем. Свържете се с нас чрез някой от следните методи:",
                contact_email: "Имейл",
                contact_phone: "Телефон",
                contact_address: "Адрес",
                admin_link: "Админ панел",
                no_locations: "Няма локации"
            },
        }
    }
});

export default i18n;
